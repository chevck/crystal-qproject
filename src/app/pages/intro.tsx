import { IntroductionProps } from "../types";

export default function IntroScreen(props: IntroductionProps) {
  return (
    <div>
      <p className='text-2xl ...'>Welcome, {props.name}</p>
      <p className='text-lg ...'>This is a test questionnaire to practice</p>
      <button className='p-5 bg-blue-400' onClick={props.nextPage}>
        Proceed
      </button>
    </div>
  );
}
