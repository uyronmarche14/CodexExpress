import { useState, useEffect, useRef } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { Calendar as MiniCalendar } from "react-calendar";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { supabase } from "./../../lib/supabase";

import "react-calendar/dist/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

/* --- 1) DATE-FNS LOCALIZER --- */
const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

/* --- 2) CSS OVERRIDES AS A STRING --- */
const tooltipStyles = `
  .event-tooltip {
    position: absolute;
    z-index: 1000;
    visibility: hidden;
    pointer-events: none;
    min-width: 320px;
    transform-origin: center bottom;
    transition: all 0.2s ease-out;
  }

  .event-wrapper:hover .event-tooltip {
    visibility: visible;
    transform: translateX(-50%) translateY(-10px);
  }

  .rbc-event {
    position: relative;
  }
`;

/* Inject the above styles into the DOM */
const StyleTag = () => <style>{tooltipStyles}</style>;

/* --- 3) EVENT TOOLTIP COMPONENT --- */
const EventTooltip = ({ event }) => (
  <div className="bg-gray-800 text-white p-6 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-sm">
    <div className="flex justify-between items-start mb-4">
      <h3 className="font-semibold text-xl text-white">{event.title}</h3>
      <span className="px-3 py-1 bg-indigo-500/30 text-indigo-200 rounded-full text-sm">
        {format(event.start, "MMM d")}
      </span>
    </div>

    <div className="space-y-4">
      {event.description && (
        <p className="text-gray-300 text-base border-b border-gray-700/50 pb-4">
          {event.description}
        </p>
      )}

      <div className="grid gap-3">
        {/* Time */}
        <div className="flex items-center text-gray-300">
          <svg
            className="w-5 h-5 mr-3 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            {format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}
          </span>
        </div>

        {/* Location */}
        {event.location && (
          <div className="flex items-center text-gray-300">
            <svg
              className="w-5 h-5 mr-3 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{event.location}</span>
          </div>
        )}

        {/* Attendees */}
        {event.attendees && (
          <div className="flex items-center text-gray-300">
            <svg
              className="w-5 h-5 mr-3 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <div className="flex items-center gap-2">
              <span>{event.attendees.length} attendees:</span>
              <span className="text-sm text-gray-400">
                {event.attendees.join(", ")}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

EventTooltip.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
    location: PropTypes.string,
    attendees: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

/* --- 4) SAMPLE DATA --- */

/* --- 5) EVENT WRAPPER: USING A PORTAL FOR THE TOOLTIP --- */
function CustomEventWrapper({ event, children }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  return (
    <div
      className="event-wrapper"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip &&
        createPortal(
          <div
            ref={tooltipRef}
            className="event-tooltip"
            style={{
              zIndex: 9999,
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginBottom: "5px",
            }}
          >
            <EventTooltip event={event} />
          </div>,
          document.getElementById("calendar-tooltips")
        )}
    </div>
  );
}
CustomEventWrapper.propTypes = {
  event: EventTooltip.propTypes.event,
  children: PropTypes.node,
};

/* --- 6) EVENT STYLE GETTER --- */
function eventStyleGetter() {
  return {
    style: {
      backgroundColor: "rgba(79, 70, 229, 0.9)",
      borderRadius: "8px",
      color: "#fff",
      border: "none",
      padding: "4px 8px",
    },
  };
}

/* --- 7) CUSTOM TOOLBAR --- */
function CustomToolbar({ label, onNavigate }) {
  const handleNext = () => onNavigate("NEXT");
  const handlePrev = () => onNavigate("PREV");
  const handleToday = () => onNavigate("TODAY");

  return (
    <div className="bg-gray-900 flex flex-col gap-4 px-6 pt-6 pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-white">{label}</h2>
          <div className="flex items-center space-x-2">
            {/* Prev */}
            <button
              onClick={handlePrev}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            {/* Next */}
            <button
              onClick={handleNext}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Today Button */}
        <button
          onClick={handleToday}
          className="px-4 py-2 rounded-md bg-gray-800 text-gray-100 hover:bg-gray-700 text-sm"
        >
          Today
        </button>
      </div>
    </div>
  );
}
CustomToolbar.propTypes = {
  label: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

/* --- 8) EVENT MODAL (for viewing/editing an event) --- */
function EventModal({ event, onClose, onDelete, onUpdate }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000]">
      <div className="bg-gray-800 rounded-xl max-w-lg w-full mx-4 animate-fadeIn">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {event.title}
              </h2>
              <p className="text-indigo-400 mt-1">
                {format(event.start, "EEEE, MMMM d, yyyy")}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Description */}
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <p className="text-gray-300">{event.description}</p>
            </div>

            {/* Time & Location */}
            <div className="grid gap-3">
              <div className="flex items-center text-gray-300">
                <svg
                  className="w-5 h-5 mr-3 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  {format(event.start, "h:mm a")} -{" "}
                  {format(event.end, "h:mm a")}
                </span>
              </div>

              {event.location && (
                <div className="flex items-center text-gray-300">
                  <svg
                    className="w-5 h-5 mr-3 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            {/* Attendees */}
            {event.attendees && (
              <div className="border-t border-gray-700 pt-4 mt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-3">
                  Attendees
                </h3>
                <div className="flex flex-wrap gap-2">
                  {event.attendees.map((attendee, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                    >
                      {attendee}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 border-t border-gray-700 pt-4">
            <button
              onClick={() => onDelete(event.id)}
              className="px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg"
            >
              Delete
            </button>
            <button
              onClick={() => onUpdate(event)}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
EventModal.propTypes = {
  event: EventTooltip.propTypes.event,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

/* --- 9) MAIN COMPONENT --- */
export default function AdminCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data: appointmentsData, error } = await supabase
        .from("appointments")
        .select("*");

      if (error) throw error;

      // Transform the data to match the calendar event format
      const transformedData = appointmentsData.map((appointment) => ({
        id: appointment.id,
        title: `${appointment.name} - ${appointment.service}`,
        description: appointment.description,
        location: appointment.address,
        start: new Date(
          `${appointment.appointment_date}T${appointment.appointment_time}`
        ),
        end: new Date(
          `${appointment.appointment_date}T${appointment.appointment_time}`
        ),
        attendees: [appointment.name],
        status: appointment.status,
        email: appointment.email,
        phone: appointment.phone,
        meetingType: appointment.meeting_type,
      }));

      setAppointments(transformedData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleSlotSelect = async ({ start }) => {
    const title = window.prompt("Enter event title:");
    if (title) {
      try {
        const { error } = await supabase.from("appointments").insert([
          {
            name: title,
            appointment_date: start.toISOString().split("T")[0],
            appointment_time: start.toTimeString().split(" ")[0],
            status: "scheduled",
          },
        ]);

        if (error) throw error;
        fetchAppointments(); // Refresh the calendar
      } catch (error) {
        console.error("Error creating event:", error);
      }
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", eventId);

      if (error) throw error;

      setSelectedEvent(null);
      fetchAppointments(); // Refresh the calendar
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleUpdateEvent = async (event) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({
          status: "updated",
          // Add other fields you want to update
        })
        .eq("id", event.id);

      if (error) throw error;

      setSelectedEvent(null);
      fetchAppointments(); // Refresh the calendar
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => setSelectedEvent(null);

  // Add useEffect to create portal container
  useEffect(() => {
    if (!document.getElementById("calendar-tooltips")) {
      const portalDiv = document.createElement("div");
      portalDiv.id = "calendar-tooltips";
      document.body.appendChild(portalDiv);
    }

    // Cleanup on unmount
    return () => {
      const portalDiv = document.getElementById("calendar-tooltips");
      if (portalDiv) {
        portalDiv.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-200">
      {/* Insert the tooltip CSS */}
      <StyleTag />
      <div id="calendar-tooltips" /> {/* Add this line as fallback */}
      {/* LEFT SIDEBAR */}
      <aside className="w-72 border-r border-gray-800 p-6 space-y-8 bg-gray-900">
        {/* Admin info */}
        <div className="flex items-center space-x-4">
          <div className="bg-gray-800 rounded-full h-12 w-12 flex items-center justify-center text-xl font-light">
            A
          </div>
          <div>
            <div className="text-gray-100 font-light">Admin Name</div>
            <div className="text-gray-400 text-sm">Administrator</div>
          </div>
        </div>

        {/* Mini calendar */}
        <div className="rounded-lg overflow-hidden">
          <MiniCalendar
            onChange={setDate}
            value={date}
            className="!bg-gray-800 border-0"
            navigationLabel={({ date }) =>
              date.toLocaleString("default", { month: "long", year: "numeric" })
            }
            tileClassName={({ view }) =>
              `!text-gray-300 hover:!bg-gray-700 !rounded-lg ${
                view === "month" && "h-8 flex items-center justify-center"
              }`
            }
          />
        </div>

        {/* My Calendars */}
        <div>
          <h3 className="text-gray-300 font-light text-sm uppercase tracking-wide mb-2">
            My Calendars
          </h3>
          <ul className="space-y-2">
            <li className="text-gray-400 hover:text-gray-200 cursor-pointer">
              All Users
            </li>
            <li className="text-gray-400 hover:text-gray-200 cursor-pointer">
              Tasks
            </li>
            <li className="text-gray-400 hover:text-gray-200 cursor-pointer">
              Birthdays
            </li>
          </ul>
        </div>
      </aside>
      {/* MAIN CALENDAR AREA */}
      <main className="flex-1 relative">
        <BigCalendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          views={["month"]} // Using only "month" for demonstration
          defaultView="month"
          components={{
            toolbar: CustomToolbar,
            // Use the custom event wrapper so tooltips render in a portal
            eventWrapper: CustomEventWrapper,
          }}
          eventPropGetter={eventStyleGetter}
          selectable
          onSelectSlot={handleSlotSelect}
          onSelectEvent={handleEventSelect}
          style={{ height: "100vh" }}
          className="dark-calendar"
        />

        {/* If an event is selected, show the modal */}
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={handleCloseModal}
            onDelete={handleDeleteEvent}
            onUpdate={handleUpdateEvent}
          />
        )}
      </main>
    </div>
  );
}
