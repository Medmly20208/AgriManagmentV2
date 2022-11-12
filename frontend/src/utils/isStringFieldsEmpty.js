/* get values and check if are empty ,contains just spaces or not 
   will use it in form validation
   params: 
       fieldsValues:Array of strings
    return bool
       true : if just one of the input array is empty or contains just spacecs
       false: if all values of are non spaces and non empty

 */

export default function isStringFieldsEmpty(...fieldsValues) {
  for (let index = 0; index < fieldsValues.length; index += 1) {
    if (fieldsValues[index].trim().length === 0) {
      return true;
    }
  }
  return false;
}
