import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import myDoc_logo from './myDoc_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    myDoc_logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General Physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatrician',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Jay Srivastav',
        image: doc1,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Jay is dedicated to preventive care and timely diagnosis, ensuring holistic well-being for patients in his Kolkata clinic.',
        fees: 300,
        address: {
            line1: '17th Cross, Ballygunge',
            line2: 'South Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Sushmita Banerjee',
        image: doc2,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '6 Years',
        about: 'Specializing in skin and cosmetic treatments, Dr. Banerjee is known for her ethical and effective approach in Salt Lake.',
        fees: 400,
        address: {
            line1: 'Sector 1, Salt Lake City',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Abhijit Dutta',
        image: doc3,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Dutta is dedicated to preventive care and timely diagnosis, ensuring holistic well-being for patients in his Durgapur clinic.',
        fees: 800,
        address: {
            line1: 'City Centre, Durgapur',
            line2: 'West Bengal'
    }
    },
    {
        _id: 'doc4',
        name: 'Dr. Aranya Sen',
        image: doc4,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS (OBG)',
        experience: '8 Years',
        about: 'With a compassionate approach to women’s health, Dr. Sen practices in Behala, specializing in prenatal and fertility care.',
        fees: 500,
        address: {
            line1: 'Diamond Harbour Road',
            line2: 'Behala, Kolkata'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Subhashree Mitra',
        image: doc5,
        speciality: 'Pediatrician',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '7 Years',
        about: 'Dr. Mitra is well-known in Siliguri for his friendly and thorough pediatric care for newborns and children.',
        fees: 350,
        address: {
            line1: 'Sevoke Road',
            line2: 'Siliguri, West Bengal'
        }
    },
    {
        
        _id: 'doc6',
        name: 'Dr. Ivan Roy',
        image: doc6,
        speciality: 'Pediatrician',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '5 Years',
        about: 'Dr. Roy is a dedicated pediatrician in New Town, specializing in child healthcare, vaccinations, and developmental guidance for infants and children.',
        fees: 300,
        address: {
            line1: 'Action Area I',
            line2: 'New Town, Kolkata'
        }
    },
    {
    
        _id: 'doc7',
        name: 'Dr. Rakesh Chatterjee',
        image: doc7,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD (Obstetrics & Gynecology)',
        experience: '9 Years',
        about: 'Dr. Chatterjee is a highly experienced gynecologist in Howrah, specializing in women’s health, prenatal care, infertility treatment, and safe deliveries.',
        fees: 700,
        address: {
            line1: 'Shibpur Road',
            line2: 'Howrah, West Bengal'
  }
},

   {
  _id: 'doc8',
  name: 'Dr. Mousam Ghosh',
  image: doc8,
  speciality: 'General Physician',
  degree: 'MBBS, MD (General Medicine)',
  experience: '6 Years',
  about: 'Dr. Ghosh provides comprehensive primary care, managing a wide range of medical conditions and focusing on preventive health and wellness.',
  fees: 600,
  address: {
    line1: 'Deshpran Sasmal Road',
    line2: 'Tollygunge, Kolkata'
  }
},

    {
        _id: 'doc9',
        name: 'Dr. Shreya Majumder',
        image: doc9,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '11 Years',
        about: 'Dr. Majumder specializes in stroke, epilepsy, and headaches, serving patients in Bardhaman district.',
        fees: 900,
        address: {
        line1: 'Grand Trunk Road',
        line2: 'Bardhaman, West Bengal'
    }
    },
    {
  _id: 'doc10',
  name: 'Dr. Santanu Das',
  image: doc10,
  speciality: 'Dermatologist',
  degree: 'MBBS, MD (Dermatology)',
  experience: '5 Years',
  about: 'Dr. Das specializes in diagnosing and treating various skin, hair, and nail conditions, offering both medical and cosmetic dermatology services.',
  fees: 350,
  address: {
    line1: 'Block A, Kalyani',
    line2: 'Nadia, West Bengal'
  }
},

   {
  _id: 'doc11',
  name: 'Dr. Srinjoyee Ghosh',
  image: doc11,
  speciality: 'Gynecologist',
  degree: 'MBBS, MS (Obstetrics & Gynecology)',
  experience: '12 Years',
  about: 'Practicing in Midnapore, Dr. Ghosh specializes in women’s reproductive health, pregnancy care, and management of gynecological disorders.',
  fees: 750,
  address: {
    line1: 'Hospital Road',
    line2: 'Midnapore, West Bengal'
  }
},
    {
    id: 'doc12',
    name: 'Dr. Priyankan Saha',
    image: doc12,
    speciality: 'Neurologist', 
    degree: 'MBBS, MD, DM (Neurology)', 
    experience: '6 Years',
    about: 'Dr. Saha specializes in neurological disorders including epilepsy, stroke, and movement disorders.', //
    fees: 450,
    address: {
        line1: 'Shyambazar Crossing',
        line2: 'North Kolkata, West Bengal'
    }

    },
    {
    id: 'doc13',
    name: 'Dr. Anindita Pal',
    image: doc13,
    speciality: 'Gastroenterologist', 
    degree: 'MBBS, MD, DM (Gastroenterology)',
    experience: '13 Years',
    about: 'Expert in digestive disorders and liver diseases, Dr. Pal has led numerous GI awareness campaigns.',
    fees: 1000,
    address: {
        line1: 'EM Bypass',
        line2: 'Anandapur, Kolkata'
    }
    },
    {
    _id: 'doc14',
    name: 'Dr. Rajesh Nandy',
    image: doc14,
    speciality: 'Gastroenterologist',
    degree: 'MBBS, MD, DM (Endocrinology)',
    experience: '8 Years',
    about: 'Dr. Nandy treats thyroid, diabetes, and hormonal issues with a compassionate and evidence-based approach.',
    fees: 550,
    address: {
        line1: 'Prince Anwar Shah Road',
        line2: 'South City, Kolkata'
    }
    },
    {
    _id: 'doc15',
    name: 'Dr. Drishti Bhattacharya',
    image: doc15,
    speciality: 'Dermatologist',
    degree: 'MBBS, MD(Dermatology)',
    experience: '9 Years',
    about: 'Specializing in skin and cosmetic treatments, Dr. Banerjee is known for her ethical and effective approach in Asansol.',
    fees: 500,
    address: {
        line1: 'GT Road',
        line2: 'Asansol, West Bengal'
    }
    }
]
