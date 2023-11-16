export type TypeOfTest = "Unit" | "Endt to end" | "Integration";
export type GenerateTestParams = {
  apiKey: string;
  code: string;
  type: TypeOfTest;
  technologies: string;
  instructions: string;
};
