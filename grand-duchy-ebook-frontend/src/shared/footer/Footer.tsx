const Footer = () => {
  return (
    <div className="text-center text-gray text-sm p-4">
      <p>
        &copy; {new Date().getFullYear()} The Grand Duchy. All rights reserved.
      </p>
      <p>
        Unauthorized reproduction or distribution of this ebook series is
        strictly prohibited.
      </p>
    </div>
  );
};

export default Footer;
