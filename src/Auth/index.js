const Register = () => {

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: " column",
        }}
      >
        Register Page
        <form
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: " column", width: "30%",
          }}
          onSubmit={(e) => e.preventDefault()}
          autoComplete="off"
        >
          <input name="firstName" type="text" placeholder="First Name..." />
          <input name="lastName" type="text" placeholder="Last Name..." />
          <input name="email" type="text" placeholder="Email..." />
          <input name="password" type="text" placeholder="Password..." />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default Register;