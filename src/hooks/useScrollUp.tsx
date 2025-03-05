import { useLayoutEffect, useState } from "react";

interface UseScrollUpProps {
  distance: number;
}

export const useScrollUp = ({ distance }: UseScrollUpProps) => {
  const [show, setShow] = useState(false);
  useLayoutEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > distance);
    };

    setShow(window.scrollY > distance);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [distance]);

  return show;
};
