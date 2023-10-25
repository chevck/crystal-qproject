import { RegistrationProps } from "../types";

export default function Register({
  setData,
  data,
  nextPage,
}: RegistrationProps) {
  const handleChange = (target: string, value: string) => {
    setData({ ...data, [target]: value });
  };
  return (
    <div>
      <div>
        <p>Full Name</p>
        <input
          className='p-2'
          name='name'
          onChange={({ target: { name, value } }) => handleChange(name, value)}
        />
      </div>
      <div className='pt-2'>
        <p>Email Address Name</p>
        <input
          className='p-2'
          name='email'
          onChange={({ target: { name, value } }) => handleChange(name, value)}
        />
      </div>
      <div className='pt-3'>
        <button className='bg-green-700 p-3 rounded-md' onClick={nextPage}>
          Start
        </button>
      </div>
    </div>
  );
}
