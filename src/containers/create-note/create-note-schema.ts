import * as Yup from 'yup';

export const createNoteSchema = new Yup.object().shape({
  title: Yup.string().required('Ingrese el título'),
  content: Yup.string()
              .test('len', 'Ingrese al menos 120 caracteres', val => val?.length > 120)
              .required('Ingrese el contenido')
});
