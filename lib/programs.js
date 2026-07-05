export const PROGRAMS = {
  clarity_session: {
    id: "clarity_session",
    title: "Clarity Session",
    amount: 19900,
    currency: "INR",
  },
  full_program: {
    id: "full_program",
    title: "Full Program",
    amount: 999900,
    currency: "INR",
  },
  mentorship: {
    id: "mentorship",
    title: "DreamAndScale Plus",
    amount: 4999000,
    currency: "INR",
  },
};

export function getProgram(programId) {
  return PROGRAMS[programId] || PROGRAMS.clarity_session;
}

export function hasProgram(programId) {
  return Boolean(PROGRAMS[programId]);
}
