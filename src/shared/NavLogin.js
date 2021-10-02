// import React, {useEffect, useState} from  'react';

import Nav from 'react-bootstrap/Nav'
const NavLogin = () => {
    return(
        <div class="row">
            <Nav variant="pills" defaultActiveKey="/home" className="justify-content-end">
            <Nav.Item>
                <Nav.Link href="/home">Cerrar Sesión</Nav.Link>
            </Nav.Item>
            </Nav>
        </div>
    );
}

export default NavLogin;