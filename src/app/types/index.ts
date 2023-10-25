export interface IntroductionProps {
  name: string;
  nextPage: () => void;
}

export interface RegistrationProps {
  data: {
    name: string;
    email: string;
  };
  setData: (payload: { name: string; email: string }) => void;
  nextPage: () => void;
}
