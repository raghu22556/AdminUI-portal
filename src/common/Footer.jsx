import { Typography } from '@material-tailwind/react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="flex w-full flex-row flex-wrap   border-t border-blue-gray-50 py-6  md:justify-between">
      <ul className="flex flex-wrap  gap-y-2 gap-x-8" style={{ marginTop: '10px' }}>
        <li className="footer-item">
          <Typography
            as="a"
            style={{ fontSize: '10px', marginLeft: '0px' }}
            href="#"
            color="blue-gray"
            className="footer_copyright_text font-normal transition-colors hover:text-blue-500 focus:text-blue-500 text-xs sm:text-sm md:text-base lg:text-lg flex-col w-full sm:w-auto"
          >
            Copyright © 2022 Maiden Cube Pvt Ltd . All rights reserved.
          </Typography>
        </li>
        <li className="footer-item">
          <Typography
            as="a"
            href="#"
            style={{
              fontSize: '10px',
              marginLeft: '210px',
              marginRight: '20px',
            }}
            color="blue-gray"
            className="footer_privacy_policy_texts font-normal transition-colors hover:text-blue-500 focus:text-blue-500 text-xs sm:text-sm md:text-base lg:text-lg flex-col w-full sm:w-auto"
          >
            Privacy Policy
          </Typography>
        </li>
        <li className="footer-item">
          <Typography
            as="a"
            href="#"
            style={{ fontSize: '10px' }}
            color="blue-gray"
            className="footer_term_conditionfont-normal transition-colors hover:text-blue-500 focus:text-blue-500 text-xs sm:text-sm md:text-base lg:text-lg flex-col w-full sm:w-auto"
          >
            Terms & Condition
          </Typography>
        </li>
      </ul>
    </footer>
  );
}
