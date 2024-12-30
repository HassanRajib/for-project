import { IconButton } from '@mui/material';
import Search from "@mui/icons-material/Search";
import AppIcon from "@mui/icons-material/Apps";
import DropDown from "@mui/icons-material/ArrowDropDown";
import Stor from "@mui/icons-material/Storage";

import FolOpn from '@mui/icons-material/FolderOpen'
import Card from '../img/card.png'
import formIcon from '../img/form.png'
import Dcard from '../img/image.png'
import { useNavigate } from 'react-router-dom';
import { v4 as Uuid } from 'uuid';

function Home() {

  const history = useNavigate()
  const createForm = () =>{
  const id = Uuid()
  history (`/Qus/${id}`)
  }



  return (
    <div className='home'>
      {/* Header Section */}
      <div className='header flex justify-between items-center bg-antiquewhite text-black p-1 mx-2'>
        <div className='head_info flex items-center'>
          <img src={formIcon} className='h-9 w-9' alt='nofile' />
        </div>

        <div className='head_search flex items-center bg-white w-[650px] h-10 rounded-md'>
          <Search />
          <input type='text' name='search' placeholder='Search' className='border-none outline-none bg-transparent w-full h-9' />
        </div>

        <div className='head_right flex items-center'>
          <IconButton>
            <AppIcon />
          </IconButton>
        </div>
      </div>

      {/* Template Section */}
      <div className='template_sec bg-gray-100 py-10'>
        <div className='template_top mx-24 flex justify-between items-center'>
          <div className='template_left ml-28 text-lg font-semibold'>
            start new form
          </div>
        </div>
        <div className='template_body mx-40 flex items-center'>
          <div className='card ml-5 mt-4' onClick={createForm}>
            <img src={Card} alt='no' className='card_im h-30 w-36 cursor-pointer rounded-md border-[0.2px] border-white hover:border-1 hover:border-purple-800' />
            <p className='card_ti text-center'>card1</p>
          </div>
          <div className='card ml-5 mt-4'>
            <img src={Card} alt='no' className='card_im h-30 w-36 cursor-pointer rounded-md border-[0.2px] border-white hover:border-1 hover:border-purple-800' />
            <p className='card_ti text-center'>card2</p>
          </div>
          <div className='card ml-5 mt-4'>
            <img src={Card} alt='no' className='card_im h-30 w-36 cursor-pointer rounded-md border-[0.2px] border-white hover:border-1 hover:border-purple-800' />
            <p className='card_ti text-center'>card3</p>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className='main_body bg-white mx-40'>
        <div className='main_top mt-4 flex justify-between items-baseline'>
          <div className='mbtole text-lg font-medium'>
            recent forms
          </div>
          <div className='mbtoca flex items-center text-sm mr-2'>
            owned by anyone <DropDown />
          </div>
          <div className='mbtori flex'>
            <IconButton>
              <Stor />
            </IconButton>
            <IconButton>
              <FolOpn />
            </IconButton>
          </div>
        </div>
        <div className='main_doc'>
          <div className='doc_im'>
            <img src={Dcard} alt='no' className='doc_im_cont w-20 h-20' />
            <h4></h4>
            <div className='doc_con flex items-center'>
              <Stor className='text-white text-xs bg-purple-800 p-1 mr-1 rounded-md' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
