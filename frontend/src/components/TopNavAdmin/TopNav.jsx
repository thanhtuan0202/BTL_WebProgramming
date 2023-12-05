import React from 'react'

import './style.css'

import { Link } from 'react-router-dom'

import Dropdown from '../dropdown/Dropdown'

import user_image from './user_img.svg'

import user_menu from '../../assets/JsonData/user_menus.json'

const curr_user = {
    display_name: 'Quản trị viên - Admin    ',
    image: user_image
}
const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
    </div>
)

const renderUserMenu =(item, index) => (
    <Link to={item.route} key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const Topnav = () => {
    return (
        <div className='topnav'>
            <div className="topnav__search">
                <input type="text" placeholder='Tìm kiếm...' />
                <i className='bx bx-search'></i>
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
            </div>           
        </div>
    )
}

export default Topnav
