export const mockAppointments = [
  {
    id: 1,
    title: "Team Standup",
    description: "Daily team sync to discuss progress and blockers",
    location: "Meeting Room A",
    attendees: ["John", "Sarah", "Mike", "Lisa"],
    start: new Date(new Date().setHours(9, 0, 0)),
    end: new Date(new Date().setHours(9, 30, 0)),
  },
  {
    id: 2,
    title: "Product Review",
    description: "Monthly product review with stakeholders",
    location: "Conference Room B",
    attendees: ["Alice", "Bob", "Charlie", "David"],
    start: new Date(new Date().setHours(11, 0, 0)),
    end: new Date(new Date().setHours(12, 0, 0)),
  },
  {
    id: 3,
    title: "Client Meeting",
    description: "Discussion about new feature requirements",
    location: "Virtual Meeting Room",
    attendees: ["Eve", "Frank", "Grace"],
    start: new Date(new Date().setHours(14, 0, 0)),
    end: new Date(new Date().setHours(15, 30, 0)),
  },
  {
    id: 4,
    title: "Design Workshop",
    description: "UX/UI design workshop for new dashboard",
    location: "Design Studio",
    attendees: ["Helen", "Igor", "Julia"],
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
  {
    id: 5,
    title: "Sprint Planning",
    description: "Plan next sprint tasks and assignments",
    location: "Meeting Room C",
    attendees: ["Karl", "Linda", "Mike", "Nina"],
    start: new Date(new Date().setDate(new Date().getDate() + 2)),
    end: new Date(new Date().setDate(new Date().getDate() + 2)),
  },
  {
    id: 6,
    title: "Code Review",
    description: "Review PRs and discuss technical implementation",
    location: "Tech Lab",
    attendees: ["Oscar", "Paula", "Quinn"],
    start: new Date(new Date().setDate(new Date().getDate() + 3)),
    end: new Date(new Date().setDate(new Date().getDate() + 3)),
  },
];

// You can add more mock data categories here if needed
export const mockCategories = [
  { id: 1, name: "Meetings", color: "#4F46E5" },
  { id: 2, name: "Reviews", color: "#059669" },
  { id: 3, name: "Workshops", color: "#DC2626" },
];
