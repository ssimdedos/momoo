import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function MoveToTop() {
  const {pathname} = useLocation();

  useEffect(()=> {
    window.scrollTo({top: 0, behavior:'instant'});
  }, [pathname]);

  return null
}