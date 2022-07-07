import { useMemo } from 'react';
import Lottie from 'react-lottie';
import { LOTTIE, defaultOptions } from "~/lottie";

// types
import type { FC } from 'react';


export interface LoaderProps {
  show: boolean
}

const Loader: FC<LoaderProps> = (props) => {
  const { show } = props

  const loaderPlay = useMemo(() => show ? "visible" : "hidden", [show])

  return (
    <div className={`${loaderPlay} absolute z-50 w-screen h-screen bg-white flex items-center`}>
      <Lottie
        options={{
          ...defaultOptions, 
          animationData: LOTTIE.loader,
        }}
        height={300}
        width={300}
      />
    </div>
  )
}

export default Loader