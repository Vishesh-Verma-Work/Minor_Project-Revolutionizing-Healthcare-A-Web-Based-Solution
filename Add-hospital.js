// Header
let hamburger = document.querySelector("#hamburger");
let headerDown = document.querySelector(".header-down");
let cross = document.querySelector("#cross");

hamburger.addEventListener("click", () => {
    headerDown.style.display = "flex";
    hamburger.style.display = "none";
    cross.style.display = "flex";
    // console.log("Clicked");
});

cross.addEventListener("click", () => {
    headerDown.style.display = "none";
    hamburger.style.display = "flex";
    cross.style.display = "none";
});



//   info catch 

let HospitalName = document.querySelector("#hospitalName");
let Address = document.querySelector("#address");
let City = document.querySelector("#city");
let Pincode = document.querySelector("#pincode");
let Country = document.querySelector("#country");
let Phone1 = document.querySelector("#phoneNumber1");
let Phone2 = document.querySelector("#phoneNumber2");
let Email1 = document.querySelector("#email1");
let Email2 = document.querySelector("#email2");
let HospitalDescription = document.querySelector("#hospitalDescription");
let DoctorStaff = document.querySelector("#doctorStaff");
let OperationHours = document.querySelector("#operationHours");
let AppointmentService = document.querySelector("#appointmentService");
let CertificationAuthentication = document.querySelector("#certificationAuthentication");
let UserForm = document.querySelector("#userForm");

let code = document.querySelector("#code");


userForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = {
        dataHospitalName: HospitalName.value,
        dataAddress: Address.value,
        dataCity: City.value,
        datapincode: Pincode.value,
        dataCountry: Country.value,
        dataPhone1: Phone1.value,
        dataPhone2: Phone2.value,
        dataEmail1: Email1.value,
        dataEmail2: Email2.value,
        dataHospitalDescription: HospitalDescription.value,
        dataDoctorStaff: DoctorStaff.value,
        dataOperationHours: OperationHours.value,
        dataAppointmentService: AppointmentService.value,
        datacertificationAuthentication: CertificationAuthentication.value
    };
    console.log(data);


    displayHospitalName.innerText = data.dataHospitalName;
    displayAddress.innerText = data.dataAddress;
    displayCity.innerText = data.dataCity;
    displaypincode.innerText = data.datapincode;
    displayCountry.innerText = data.dataCountry.value,
        displayPhone1.innerText = data.dataPhone1;
    displayPhone2.innerText = data.dataPhone2;
    displayEmail1.innerText = data.dataEmail1;
    displayEmail2.innerText = data.dataEmail2;
    displayHospitalDescription.innerText = data.dataHospitalDescription;
    displayDoctorStaff.innerText = data.dataDoctorStaff;
    displayOperationHours.innerText = data.dataOperationHours;
    displayAppointmentService.innerText = data.dataAppointmentService;
    displaycertificationAuthentication.innerText = data.datacertificationAuthentication;

    const jsonString = JSON.stringify(data, null, 2);
    code.innerText = jsonString;


});




