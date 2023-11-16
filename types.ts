export type TypeOfTest = "Unit" | "End to end" | "Integration";
export type GenerateTestParams = {
  apiKey: string;
  code: string;
  type: TypeOfTest;
  technologies: string;
  instructions: string;
};
