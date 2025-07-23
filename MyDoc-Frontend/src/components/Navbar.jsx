
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <img 
      className='w-[70px] h-[43px]'
      src={assets.myDoc_logo} alt="" />
      <ul>
        <NavLink>
            <li>Home</li>
            <hr />
        </NavLink>
        <NavLink>
            <li>All Doctors</li>
            <hr />
        </NavLink>
        <NavLink>
            <li>About</li>
            <hr />
        </NavLink>
        <NavLink>
            <li>Contact</li>
            <hr />
        </NavLink>
      </ul>
      <div>
        <button>Create/Login</button>
      </div>
    </div>
  )
}

export default Navbar
