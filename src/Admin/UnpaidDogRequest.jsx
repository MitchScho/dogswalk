/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import moment from 'moment';

function UnpaidDogRequest({ request }) {
  // console.log('unpaid dog request', request);
  // console.log('unpaid dog request date', request.date.format('dddd'));

  const date = moment(request.date);

  return (
    <>
      <div>{date.format('MMM D')}</div>
      {/* <button onClick={handlePaidFor} className={isPaidForClass}>
        Payed For
      </button> */}
    </>
  );
}

export default UnpaidDogRequest;
