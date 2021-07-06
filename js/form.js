const adForm = document.querySelector('.ad-form');
const fieldsetBlocks = adForm.querySelectorAll('fieldset');
const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  fieldsetBlocks.forEach((fieldsetBlock) => {
    fieldsetBlock.setAttribute('disabled', 'disabled');
  });
};
const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldsetBlocks.forEach((fieldsetBlock) => {
    fieldsetBlock.removeAttribute('disabled');
  });
};
export {disableAdForm, enableAdForm};
