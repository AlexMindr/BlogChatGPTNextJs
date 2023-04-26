import React from "react";

const Footer = () => {
  return (
    <footer className="bg-wh-900 text-wh-50 p-10">
      <div className="justify-between mx-auto gap-16 sm:flex">
        {/* First col */}
        <div className="mt-16 basis-1/2 sm:mt-0">
          <h4 className="font-bold">BLOG OF THE FUTURE</h4>
          <p className="my-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis
            possimus nam quasi, libero quo ullam voluptates laborum perspiciatis
            natus? Sapiente, labore voluptatum. Reprehenderit maiores sunt
            itaque, reiciendis labore necessitatibus. Delectus.
          </p>
          <p>©Blog of the Future All Rights Reserved</p>
        </div>
        {/* Second col */}
        <div className="mt-16 basis-1/4 sm:mt-0">
          <h4 className="font-bold">LINKS</h4>
          <p className="my-5">
            Natus? Sapiente, labore voluptatum. Reprehenderit maiores sunt
          </p>
          <p className="my-5">Random link/info</p>
          <p>Some blog info again</p>
        </div>
        {/* Third col */}
        <div className="mt-16 basis-1/4 sm:mt-0">
          <h4 className="font-bold">Contact Us</h4>
          <p className="my-5">Labore voluptatum. Reprehenderit maiores sunt</p>
          <p>(123)456-7891</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
