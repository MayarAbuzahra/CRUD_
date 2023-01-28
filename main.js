//get input values
let course_name=document.getElementById('courseName')
let course_category=document.getElementById('courseCategory')
let course_price=document.getElementById('coursePrice')
let course_description=document.getElementById('courseDescription')
let course_capacity=document.getElementById('courseCapacity')
let data=document.getElementById('data')
let search=document.getElementById('search')
let delete_button=document.getElementById('deleteBtn')
let add_button=document.getElementById('click')
let courses
if(JSON.parse(localStorage.getItem('courses'))==null){
    courses=[]
}
else{
    courses=JSON.parse(localStorage.getItem('courses'))
    display_data()
}
let current_index=0

//create course
add_button.onclick=function(event){
    event.preventDefault();
    if(add_button.value=='Add Course'){
        add_course()
    }
    else{
        update_course()
    }
    display_data()
    clear_inputs()
    course_name.classList.remove('is-valid')
}

//add course
function add_course(){
    let course={
        course_name: course_name.value,
        course_category: course_category.value,
        course_price: course_price.value,
        course_description: course_description.value,
        course_capacity: course_capacity.value
    }
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course added successfully',
        showConfirmButton: false,
        timer: 1500
    })
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
    let result='';
    for(let i=0; i<courses.length; i++){
        result+=`
        <tr>
            <td>${i+1}</td>
            <td>${courses[i].course_name}</td>
            <td>${courses[i].course_category}</td>
            <td>${courses[i].course_price}</td>
            <td>${courses[i].course_description}</td>
            <td>${courses[i].course_capacity}</td>
            <td><button class="btn btn-info" onclick="get_course(${i})">Update</button></td>
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
            localStorage.setItem('courses', JSON.stringify(courses))
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
        localStorage.setItem('courses', JSON.stringify(courses))
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
    let result='';
    for(let i=0; i<courses.length; i++){
        if(courses[i].course_name.toLowerCase().includes(search.value.toLowerCase())){
            result+=`
            <tr>
                <td>${i+1}</td>
                <td>${courses[i].course_name}</td>
                <td>${courses[i].course_category}</td>
                <td>${courses[i].course_price}</td>
                <td>${courses[i].course_description}</td>
                <td>${courses[i].course_capacity}</td>
                <td><button class="btn btn-info" onclick="get_course(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick="delete_course(${i})">Delete</button></td>
            </tr>`
        }
    }
    data.innerHTML=result; 
}

//get course
function get_course(index){
    let course=courses[index]
    course_name.value=course.course_name
    course_category.value=course.course_category
    course_price.value=course.course_price
    course_description.value=course.course_description
    course_capacity.value=course.course_capacity
    add_button.value='Update Course'
    current_index=index
}

//update course
function update_course(){
    let course={
        course_name: course_name.value,
        course_category: course_category.value,
        course_price: course_price.value,
        course_description: course_description.value,
        course_capacity: course_capacity.value
    }
    courses[current_index].course_name=course.course_name
    courses[current_index].course_category=course.course_category
    courses[current_index].course_price=course.course_price
    courses[current_index].course_description=course.course_description
    courses[current_index].course_capacity=course.course_capacity
    localStorage.setItem('courses', JSON.stringify(courses))
    add_button.value='Add Course'
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course updated successfully',
        showConfirmButton: false,
        timer: 1500
    })
}

//validation
/* course name
*  regex /^[A-Z][a-z]{2,10}$/
*/
course_name.onkeyup=function(){
    let pattern=/^[A-Z][a-z]{2,10}$/
    if(pattern.test(course_name.value)){
        if(course_name.classList.contains('is-invalid')&&
           document.getElementById('course_name_alert').classList.contains('d-block')){
            course_name.classList.replace('is-invalid','is-valid')
            document.getElementById('course_name_alert').classList.replace('d-block','d-none')
           }
           else{
            course_name.classList.add('is-valid')
            document.getElementById('course_name_alert').classList.replace('d-block','d-none')
           }
           add_button.removeAttribute('disabled')
    }
    else{
        if(course_name.classList.contains('is-valid')&&
           document.getElementById('course_name_alert').classList.contains('d-none')){
            course_name.classList.replace('is-valid','is-invalid')
            document.getElementById('course_name_alert').classList.replace('d-none','d-block')
           }
        else{
            course_name.classList.add('is-invalid')
            document.getElementById('course_name_alert').classList.replace('d-none','d-block')
        }
        add_button.setAttribute('disabled')
    }
}

/* course category
*  regex /^[A-Z][a-z]{2,20}$/
*/
course_category.onkeyup=function(){
    let pattern=/^[A-Z][a-z]{2,20}$/
    if(pattern.test(course_category.value)){
        if(course_category.classList.contains('is-invalid')&&
           document.getElementById('course_category_alert').classList.contains('d-block')){
            course_category.classList.replace('is-invalid','is-valid')
            document.getElementById('course_category_alert').classList.replace('d-block','d-none')
           }
           else{
            course_category.classList.add('is-valid')
            document.getElementById('course_category_alert').classList.replace('d-block','d-none')
           }
           add_button.removeAttribute('disabled')
    }
    else{
        if(course_category.classList.contains('is-valid')&&
           document.getElementById('course_category_alert').classList.contains('d-none')){
            course_category.classList.replace('is-valid','is-invalid')
            document.getElementById('course_category_alert').classList.replace('d-none','d-block')
           }
        else{
            course_category.classList.add('is-invalid')
            document.getElementById('course_category_alert').classList.replace('d-none','d-block')
        }
        add_button.setAttribute('disabled')
    }
}

/* course price
*  regex /^[0-9]{3,4}$/
*/
course_price.onkeyup=function(){
    let pattern=/^[0-9]{3,4}$/
    if(pattern.test(course_price.value)){
        if(course_price.classList.contains('is-invalid')&&
           document.getElementById('course_price_alert').classList.contains('d-block')){
            course_price.classList.replace('is-invalid','is-valid')
            document.getElementById('course_price_alert').classList.replace('d-block','d-none')
           }
           else{
            course_price.classList.add('is-valid')
            document.getElementById('course_price_alert').classList.replace('d-block','d-none')
           }
           add_button.removeAttribute('disabled')
    }
    else{
        if(course_price.classList.contains('is-valid')&&
           document.getElementById('course_price_alert').classList.contains('d-none')){
            course_price.classList.replace('is-valid','is-invalid')
            document.getElementById('course_price_alert').classList.replace('d-none','d-block')
           }
        else{
            course_price.classList.add('is-invalid')
            document.getElementById('course_price_alert').classList.replace('d-none','d-block')
        }
        add_button.setAttribute('disabled')
    }
}

/* course description
*  regex /^[A-Z][A-Za-z0-9\s]{3,120}$/
*/
course_description.onkeyup=function(){
    let pattern=/^[A-Z][A-Za-z0-9\s]{3,120}$/
    if(pattern.test(course_description.value)){
        if(course_description.classList.contains('is-invalid')&&
           document.getElementById('course_description_alert').classList.contains('d-block')){
            course_description.classList.replace('is-invalid','is-valid')
            document.getElementById('course_description_alert').classList.replace('d-block','d-none')
           }
           else{
            course_description.classList.add('is-valid')
            document.getElementById('course_description_alert').classList.replace('d-block','d-none')
           }
           add_button.removeAttribute('disabled')
    }
    else{
        if(course_description.classList.contains('is-valid')&&
           document.getElementById('course_description_alert').classList.contains('d-none')){
            course_description.classList.replace('is-valid','is-invalid')
            document.getElementById('course_description_alert').classList.replace('d-none','d-block')
           }
        else{
            course_description.classList.add('is-invalid')
            document.getElementById('course_description_alert').classList.replace('d-none','d-block')
        }
        add_button.setAttribute('disabled')
    }
}

/* course capacity
*  regex /^[0-9]{2,3}$/
*/
course_capacity.onkeyup=function(){
    let pattern=/^[0-9]{2,3}$/
    if(pattern.test(course_capacity.value)){
        if(course_capacity.classList.contains('is-invalid')&&
           document.getElementById('course_capacity_alert').classList.contains('d-block')){
            course_capacity.classList.replace('is-invalid','is-valid')
            document.getElementById('course_capacity_alert').classList.replace('d-block','d-none')
           }
           else{
            course_capacity.classList.add('is-valid')
            document.getElementById('course_capacity_alert').classList.replace('d-block','d-none')
           }
           add_button.removeAttribute('disabled')
    }
    else{
        if(course_capacity.classList.contains('is-valid')&&
           document.getElementById('course_capacity_alert').classList.contains('d-none')){
            course_capacity.classList.replace('is-valid','is-invalid')
            document.getElementById('course_capacity_alert').classList.replace('d-none','d-block')
           }
        else{
            course_capacity.classList.add('is-invalid')
            document.getElementById('course_capacity_alert').classList.replace('d-none','d-block')
        }
        add_button.setAttribute('disabled')
    }
}