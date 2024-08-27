import { Variant } from '@/constants/variantsAlert';
import clsx from 'clsx';
import { FC } from 'react';

interface AlertProps {
  message: string;
  variant: Variant;
}

const Alert: FC<AlertProps> = ({ message, variant }) => {
  const classes = clsx(
    'flex items-center p-4 mb-4 text-sm rounded-lg justify-center',
    variant === Variant.ERROR && 'text-red-800 bg-red-50',
    variant === Variant.SUCCESS && 'text-green-800 bg-green-50'
  );

  return (
    <div className={classes} role="alert">
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Alert;
