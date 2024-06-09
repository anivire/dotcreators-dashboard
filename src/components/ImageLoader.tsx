import classNames from 'classnames';
import Image from 'next/image';
import { FC, useState } from 'react';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  hideLoader?: boolean;
  unoptimized?: boolean;
  className?: string;
}

export const ImageLoader: FC<Props> = props => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div
      className={classNames(
        'relative h-fit w-fit overflow-hidden',
        props.className
      )}
    >
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        unoptimized={props.unoptimized ? true : false}
        draggable={false}
        className={classNames(
          'relative z-20 transition-all duration-300',
          props.unoptimized ? props.className : '',
          {
            'opacity-0 blur-sm': !isLoaded,
            'opacity-100 blur-0 ': isLoaded,
          }
        )}
        onLoad={() => setIsLoaded(true)}
      />
      <div
        className={classNames(
          'absolute inset-0 z-10 h-full w-full bg-dot-quaternary/50 transition-opacity duration-300',
          {
            // 'opacity-0': isLoaded,
            'animate-pulse': !isLoaded,
            hidden: props.hideLoader,
          }
        )}
      />
    </div>
  );
};
