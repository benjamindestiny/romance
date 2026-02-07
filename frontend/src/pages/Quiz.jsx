import { useState } from 'react'
import LogoLoading from "../components/LogoLoading.jsx";

export default function Quiz() {
    const [showLoader, setShowLoader] = useState(true);

     if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;
  return (
    <div>
      <h1>Coming Soon</h1>
    </div>
  )
}
