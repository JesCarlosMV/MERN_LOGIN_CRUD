import { useForm } from 'react-hook-form';

function RegisterPage() {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <form
        onSubmit={handleSubmit((valuesDeImputs) => console.log(valuesDeImputs))}
        className="flex flex-col justify-center  items-center"
      >
        <h1 className="mt-10 mb-10">Registrarse</h1>
        nick:
        <input
          type="text"
          name="nick"
          {...register('nick', { required: true })}
        />
        email:
        <input
          type="email"
          name="email"
          {...register('email', { required: true })}
        />
        password
        <input
          type="password"
          name="password"
          {...register('password', { required: true })}
        />
        <input
          type="submit"
          value="Registrarse"
          className=" mt-10 p-3 bg-cyan-500 hover:scale-125 transition-all "
        />
      </form>
    </div>
  );
}

export default RegisterPage;
