import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";
import { supabase } from "../lib/supabase";
import { addDays } from "date-fns"; // Add this import

export default function Registration() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const services = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Mobile App Development" },
    { id: 3, name: "UI/UX Design" },
    { id: 4, name: "Digital Marketing" },
    { id: 5, name: "Cloud Solutions" },
    { id: 6, name: "IT Consulting" },
  ];

  const [date, setDate] = useState(new Date());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    appType: "",
    time: "",
    meetingType: "in-person",
    description: "",
    service: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMeetingTypeChange = (e) => {
    const meetingType = e.target.value;
    setFormData({
      ...formData,
      meetingType,
      address: meetingType === "online" ? "Unavailable" : formData.address,
    });
  };

  const formatTimeWithAMPM = (time) => {
    // Convert 24-hour time to 12-hour format with AM/PM
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Add helper function to calculate estimated finish date based on service
  const getEstimatedFinishDate = (service, startDate) => {
    const estimatedDays = {
      "Web Development": 30,
      "Mobile App Development": 45,
      "UI/UX Design": 14,
      "Digital Marketing": 30,
      "Cloud Solutions": 21,
      "IT Consulting": 7,
    };

    return addDays(new Date(startDate), estimatedDays[service] || 14);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const ticket = `RES-${Math.floor(Math.random() * 10000)}`;

    try {
      // Format date and time for database
      const formattedDate = date.toISOString().split("T")[0];
      const formattedTime = formatTimeWithAMPM(formData.time);
      const estimatedFinishDate = getEstimatedFinishDate(
        formData.service,
        formattedDate
      );

      // Insert into Supabase
      const { error } = await supabase.from("appointments").insert([
        {
          ticket_id: ticket,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          service: formData.service,
          meeting_type: formData.meetingType,
          description: formData.description,
          appointment_date: formattedDate,
          appointment_time: formattedTime, // Now includes AM/PM
          estimated_finish_date: estimatedFinishDate
            .toISOString()
            .split("T")[0],
          created_at: new Date().toISOString(),
          status: "pending",
        },
      ]);

      if (error) throw error;

      // Send confirmation email to user
      const emailResponse = await fetch(
        "http://localhost:5000/api/send-confirmation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            date: date.toLocaleDateString(),
            time: formattedTime, // Include formatted time in email
            estimatedFinishDate: estimatedFinishDate.toLocaleDateString(),
            ticket,
          }),
        }
      );

      if (!emailResponse.ok) {
        throw new Error("Failed to send confirmation email");
      }

      alert(
        "Appointment booked successfully! Please check your email for confirmation details."
      );
      setIsLoading(false);
      navigate("/"); // Navigate to home after clicking OK on alert

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        appType: "",
        time: "",
        meetingType: "in-person",
        description: "",
        service: "",
      });
      setDate(new Date());
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to book appointment: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center px-4 py-10 font-roboto">
        <div className="bg-[#121217] p-8 md:p-12 rounded-xl shadow-xl w-full max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 text-center">
            Book Your Appointment
          </h1>
          <p className="text-sm md:text-lg text-[#a7a9be] mb-10 text-center">
            Seamlessly schedule your appointments and manage your time with
            ease.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Full Name */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-lg
                           bg-transparent text-white focus:outline-none focus:ring-2
                           focus:ring-[#ffb347] hover:shadow-md transition duration-150 ease-in-out"
                onChange={handleInputChange}
              />
            </div>

            {/* Email Address */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-lg
                           bg-transparent text-white focus:outline-none focus:ring-2
                           focus:ring-[#ffb347] hover:shadow-md transition duration-150 ease-in-out"
                onChange={handleInputChange}
              />
            </div>

            {/* Phone Number */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-lg
                           bg-transparent text-white focus:outline-none focus:ring-2
                           focus:ring-[#ffb347] hover:shadow-md transition duration-150 ease-in-out"
                onChange={handleInputChange}
              />
            </div>

            {/* Services Dropdown */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-white mb-2">
                Select Service
              </label>
              <select
                name="service"
                required
                value={formData.service}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg
                         bg-transparent text-white focus:outline-none focus:ring-2
                         focus:ring-[#ffb347] hover:shadow-md transition duration-150 ease-in-out"
              >
                <option value="" disabled className="text-black">
                  Choose a service
                </option>
                {services.map((service) => (
                  <option
                    key={service.id}
                    value={service.name}
                    className="text-black"
                  >
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Meeting Type */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-white mb-2">
                Meeting Type
              </label>
              <select
                name="meetingType"
                required
                value={formData.meetingType}
                onChange={handleMeetingTypeChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg
                           bg-transparent text-white focus:outline-none focus:ring-2
                           focus:ring-[#ffb347] hover:shadow-md transition duration-150 ease-in-out"
              >
                <option value="in-person" className="text-black">
                  In-person Meeting
                </option>
                <option value="online" className="text-black">
                  Online Meeting
                </option>
              </select>
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white mb-2">
                Meeting Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                disabled={formData.meetingType === "online"}
                placeholder="Enter location"
                className={`w-full px-4 py-2 border rounded-lg bg-transparent text-white
                          ${
                            formData.meetingType === "online"
                              ? "border-gray-500 cursor-not-allowed"
                              : "border-gray-600 focus:ring-2 focus:ring-[#ffb347] hover:shadow-md"
                          } transition duration-150 ease-in-out`}
                onChange={handleInputChange}
              />
            </div>

            {/* Description */}
            <div className="col-span-3">
              <label className="block text-sm font-medium text-white mb-2">
                Project Description
              </label>
              <textarea
                name="description"
                rows="4"
                className="w-full px-4 py-2 border border-gray-600 rounded-lg
                           bg-transparent text-white focus:outline-none focus:ring-2
                           focus:ring-[#ffb347] hover:shadow-md transition duration-150 ease-in-out"
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Calendar */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white mb-2">
                Select Date
              </label>
              <Calendar
                onChange={setDate}
                value={date}
                className="w-full rounded-md border border-gray-600 bg-[#121217] text-white"
              />
            </div>

            {/* Time Picker */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-white mb-2">
                Select Time
              </label>
              <input
                type="time"
                name="time"
                required
                className="w-full px-4 py-2 border border-gray-600 rounded-lg
               bg-transparent text-white focus:outline-none focus:ring-2
               focus:ring-[#ffb347] hover:shadow-md transition duration-150 ease-in-out"
                onChange={handleInputChange}
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-3 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#ff8906] text-white font-semibold py-3
                           rounded-lg hover:bg-[#e07b05] focus:outline-none
                           focus:ring-2 focus:ring-[#ffb347] ${
                             isLoading ? "opacity-75 cursor-not-allowed" : ""
                           }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Booking...
                  </div>
                ) : (
                  "Confirm Appointment"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
