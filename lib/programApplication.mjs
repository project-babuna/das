export const applicationCategory = "Build & Grow application";
export const applicationPrograms = { incubation: "Incubation", accelerator: "Accelerator", "scale-up": "Scale-up" };
export const applicationStages = ["Exploring an opportunity", "Testing a first version", "Serving paying customers", "Growing a repeatable business"];

// These bounds keep the complete application within the existing enquiry field limit.
export function validateProgramApplication(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { error: "Please complete your application." };
  const data = {};
  for (const [field, limit] of Object.entries({ program: 30, stage: 60, business: 80, problem: 200, progress: 350, support: 250 })) {
    if (typeof value[field] !== "string" || value[field].trim().length > limit) return { error: "Please check the length of your application answers." };
    data[field] = value[field].trim();
  }
  if (!Object.hasOwn(applicationPrograms, data.program) || !applicationStages.includes(data.stage)) return { error: "Choose a valid program and business stage." };
  if (!data.problem || !data.progress || !data.support) return { error: "Please answer all three business questions." };
  return { data };
}

export function formatProgramApplication(data) {
  return [
    `Program: ${applicationPrograms[data.program]}`,
    `Current stage: ${data.stage}`,
    `Business or idea: ${data.business || "Not provided"}`,
    `Problem and customer: ${data.problem}`,
    `Progress so far: ${data.progress}`,
    `Support needed: ${data.support}`,
  ].join("\n\n");
}
