const formEl = document.querySelector('.form');
formEl.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(formEl);
  const data = Object.fromEntries(formData);
  console.log(data);

  fetch('http://localhost:3000/api/createUser',{
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(data)

  }).then(res => {
    reset();
    res.json()
  
  })
  .then(data =>
    {
      GetAllStudents();
      reset();
    }
    )
  .catch(error => console.log(error));
});
//form reset
function reset(){
  formEl.reset();
}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/api/Userlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      location.href="crud_operation.html";
    } else {
      alert('wrong username or password')
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
});

