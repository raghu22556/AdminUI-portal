import React from 'react';
import { Dialog, DialogBody, Typography } from '@material-tailwind/react';
import { withTranslation } from 'react-i18next';

const FeedbackModal = (props) => {
  const { t } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <button
        onClick={handleOpen}
        role="menuitem"
        class="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 pl-1 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" class="size-5">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clip-rule="evenodd"
            fill="#90A4AE"
          />
        </svg>

        <p class="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
          Support/Feedback
        </p>
      </button>

      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
          <div className="flex items-center justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              onClick={handleOpen}
              style={{ cursor: 'pointer' }}
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="flex justify-center items-center ">
            <Typography className=" text-lg text-black font-bold">
              {t('Please share your feedback here')}
            </Typography>
          </div>
        </DialogBody>

        <DialogBody>
          <div class="flex justify-center items-center relative mt-10 h-15 w-full min-w-[100px]">
            <input class="peer h-full w-[calc(100%-100px)] border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 pl-7.5 pr-7.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 mx-auto" />
            <label class="after:content[' '] pointer-events-none absolute left-7.5 right-7.5 -top-2.5 flex h-full w-[calc(100%-100px)] select-none !overflow-visible truncate text-sm font-bold leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:left-0 after:right-0 after:block after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Feedback
            </label>
          </div>

          <div className="flex justify-center items-center mt-5">
            <button
              style={{
                background: 'linear-gradient(to right, #02f0fd, #35c4f9)',
                padding: '10px 35px',
                borderRadius: '25px',
                fontWeight: 'bold',
                color: 'white',
                marginTop: '40px',
                marginBottom: '20px',
              }}
              onClick={handleOpen}
            >
              Submit
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default withTranslation()(FeedbackModal);
