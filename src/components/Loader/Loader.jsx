import { Oval } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="silver"
      wrapperStyle={{}}
      wrapperClass="Spinner"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
