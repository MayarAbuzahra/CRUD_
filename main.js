//get input values
var course_name=document.getElementById('courseName')
var course_category=document.getElementById('courseCategory')
var course_price=document.getElementById('coursePrice')
var course_description=document.getElementById('courseDescription')
var course_capacity=document.getElementById('courseCapacity')
var data=document.getElementById('data')
var search=document.getElementById('search')
var delete_button=document.getElementById('deleteBtn')
var add_button=document.getElementById('click')
var courses=[]
var course_name_regex=/^[A-Z]{4}[0-9]{4}$/;

//create course
add_button.onclick=function(event){
    event.preventDefault();
    if( !empty_input() ){
        if(valid_course_name()){
            var course={
                course_name: course_name.value,
                course_category: course_category.value,
                course_price: course_price.value,
                course_description: course_description.value,
                course_capacity: course_capacity.value
            }
            courses.push(course);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Course added successfully',
                showConfirmButton: false,
                timer: 1500
            })
            clear_inputs();
            display_data();
        }
    }
}

//empty input check 
function empty_input(){
    if(course_name.value==""){
        Swal.fire({
            icon: 'error',
            title: 'Course Name is empty!',
            text: 'Fill it...'
        })
            return true;
    }
    else if(course_category.value==""){
        Swal.fire({
            title: 'Course Category is empty!',
            icon: 'error',
            text: 'Fill it...'
        })
            return true;
    }
    else if(course_price.value==""){
            Swal.fire({
            title: 'Course Price is empty!',
            icon: 'error',
            text: 'Fill it...'
        })  
            return true;
    }
    else if(course_description.value==""){
        Swal.fire({
            title: 'Course Description is empty!',
            icon: 'error',
            text: 'Fill it...'
        }) 
            return true;
    }
    else if(course_capacity.value==""){
        Swal.fire({
            title: 'Course Capacity is empty!',
            icon: 'error',
            text: 'Fill it...'
        })
            return true;
    }
    else{
        return false;
    }
}

//valid course name
function valid_course_name(){
    if(!(course_name_regex.test(course_name.value))){
        Swal.fire({
            title: 'Invalid Course Name, try again!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          return false;
    }   
    return true;
}

//clear inputs
function clear_inputs(){
    course_name.value=''
    course_category.value=''
    course_price.value=''
    course_description.value=''
    course_capacity.value=''
}

//read ==> display data in table
function display_data(){
    var result='';
    for(var i=0; i<courses.length; i++){
        result+=`
        <tr>
            <td>${i+1}</td>
            <td>${courses[i].course_name}</td>
            <td>${courses[i].course_category}</td>
            <td>${courses[i].course_price}</td>
            <td>${courses[i].course_description}</td>
            <td>${courses[i].course_capacity}</td>
            <td><button class="btn btn-info">Update</button></td>
            <td><button class="btn btn-danger" onclick="delete_course(${i})">Delete</button></td>
        </tr>`
    }
    data.innerHTML=result;
}

//delete course
function delete_course(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1)
            display_data()
          Swal.fire(
            'Deleted!',
            'Course has been deleted.',
            'success'
          )
        }
      })
}

//delete all
delete_button.onclick=function(){
   Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
        courses = []
        data.innerHTML=''
      Swal.fire(
        'Deleted!',
        'All Data has been deleted.',
        'success'
      )
    }
  })
}

//search operation
search.onkeyup=function(){
    var result='';
    for(var i=0; i<courses.length; i++){
        if(courses[i].course_name.toLowerCase().includes(search.value.toLowerCase())){
            result+=`
            <tr>
                <td>${i+1}</td>
                <td>${courses[i].course_name}</td>
                <td>${courses[i].course_category}</td>
                <td>${courses[i].course_price}</td>
                <td>${courses[i].course_description}</td>
                <td>${courses[i].course_capacity}</td>
                <td><button class="btn btn-info">Update</button></td>
                <td><button class="btn btn-danger" onclick="delete_course(${i})">Delete</button></td>
            </tr>`
        }
    }
    data.innerHTML=result; 
}