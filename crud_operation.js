const formEl = document.querySelector('.form');
formEl.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(formEl);
  const data = Object.fromEntries(formData);

  fetch('http://localhost:3000/api/createUser',{
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(data)

  }).then(res => {
   GetAllusers();
    reset();
    res.json()
  
  })
  .then(data =>
    {
      GetAllusers();
      reset();
    }
    )
  .catch(error => console.log(error));
});
//form reset
function reset(){
  formEl.reset();
}


// Get all students
//(async () => {

  async function GetAllusers() {
    const dataContainerEl = document.getElementById("table_body11");
    const searchInputEl = document.getElementById("searchInput");
  
    const url = "http://localhost:3000/api/getUser";
  
    // Fetch users from the API
    const fetchProducts = async () => {
      try {
        const res = await fetch(url);
  
        // Check if the response is ok
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
  
        const data = await res.json();
        // Validate if data is an array
        if (Array.isArray(data)) {
          return data; // API returns the array directly
        } else if (data.data && Array.isArray(data.data)) {
          return data.data; // Extract array from nested object
        } else {
          throw new Error("API response is not an array or valid object");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        return []; // Return an empty array on failure
      }
    };
  
    // Fetch and render data
    const users = await fetchProducts();
  
    // Template for rendering rows
    const generateobjectdata = (values) => {
      return `<tr>
        <td>${values.id}</td>
        <td>${values.userName}</td>
        <td>${values.email}</td>
        <td>${values.password}</td>
        <td>${values.confirmpassword}</td>
        <td>
          <button onclick="EditDetails(this)">Edit</button>
          <button onclick="deleteButton(${values.id})">Delete</button>
        </td>
      </tr>`;
    };
  
    // Render students' data into the table
    const renderstudentsdata = (users) => {
      dataContainerEl.innerHTML = "";
      users.forEach((values) => {
        dataContainerEl.innerHTML += generateobjectdata(values);
      });
    };
  
    // Helper function for filtering text
    const checkTextContain = (text, searchText) => {
      return text.toString().toLowerCase().includes(searchText);
    };
  
    // Filter handler for search
    const filterHandler = (event) => {
      const searchText = event.target.value.toLowerCase();
      const filteredstudentdata = users.filter((values) => {
        return (
          checkTextContain(values.id, searchText) ||
          checkTextContain(values.userName, searchText) ||
          checkTextContain(values.email, searchText) ||
          checkTextContain(values.password, searchText) ||
          checkTextContain(values.confirmpassword, searchText)
        );
      });
      renderstudentsdata(filteredstudentdata);
    };
  
    // Attach search event listener
    if (searchInputEl) {
      searchInputEl.addEventListener("keyup", filterHandler);
    } else {
      console.warn("Search input element not found!");
    }
  
    // Initial render
    renderstudentsdata(users);
  }
  
  // Invoke the function to fetch and display data
  GetAllusers();
  

// edit data

function EditDetails(id) {
  selectedRow = id.parentElement.parentElement;
document.getElementById("id").value = selectedRow.cells[0].innerHTML;
document.getElementById("userName").value = selectedRow.cells[1].innerHTML;
document.getElementById("email").value = selectedRow.cells[2].innerHTML;
document.getElementById("password").value = selectedRow.cells[3].innerHTML;
document.getElementById("confirmpassword").value = selectedRow.cells[3].innerHTML;
}

// update student

function updatestudent(){
const formData = new FormData(formEl);
const data = Object.fromEntries(formData);
fetch('http://localhost:3000/api/updateUser',{
    method: 'PUT',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(data)

}).then(res => {
  
  GetAllusers();
  reset();
  res.json()

})
.then(data =>{console.log(data);

})
.catch(error => console.log(error));
}

// delete button

function deleteButton(id){
fetch(`http://localhost:3000/api/deleteUser/${id}`, {
method: 'DELETE',
headers: {
  'Content-Type': 'application/json',

},  
})
.then(response => {
  GetAllusers();
}
)
}

// async function deleteButton(id) {
//   try {
//     const res = await fetch(`http://localhost:3000/api/deleteUser/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!res.ok) {
//       console.error(`Failed to delete user. Status: ${res.status}`);
//       return;
//     }

//     console.log('User deleted successfully');
    
//     // Call the function to refresh the user list
//     GetAllStudents(); // Replace with the correct function name if different
//   } catch (error) {
//     console.error('Error deleting user:', error);
//   }
// }
