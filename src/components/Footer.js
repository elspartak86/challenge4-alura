import React from "react";
import './Footer.css';
import { FaGithub, FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';


const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Trail Play</h5>
                <p>¡Descubre los próximos éxitos del cine! Quedate en nuestra página y disfruta de los mejores trailers de películas en un solo lugar. En nuestra web puedes incluso encontrar trailers de peliculas antiguas</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Siguenos</h5>
                <ul className="list-unstyled">
                <li><a href="https://www.facebook.com/profile.php?id=100081856103881" className="red-social"><FaFacebook /> <span className="red-social">Facebook</span></a></li>
                <li><a href="https://github.com/elspartak86" className="red-social">< FaGithub/> <span className="red-social">Github</span></a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Siguenos</h5>
                <ul className="list-unstyled">
                <li><a href="#!" className="red-social"><FaInstagram /> <span className="red-social">Instagram</span></a></li>
                <li><a href="https://web.whatsapp.com/" className="red-social"><FaWhatsapp /> <span className="red-social">Whatsapp</span></a></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2023 Trail Play Copyright:
    </div>

</footer>

export default Footer