const Footer = () => {
  return (
    <footer className="py-6 md:py-0 md:px-8 bg-black text-white border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:h-24">
        <p className="text-center text-balance text-sm leading-loose">
          Built by{" "}
          <a
            href="https://github.com/PhatHuynh0212"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            Phat Huynh
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/PhatHuynh0212/Netflix_Clone"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            Github
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
