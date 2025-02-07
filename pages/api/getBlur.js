import { getPlaiceholder } from 'plaiceholder';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: 'Falta la URL de la imagen' });
  }

  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return res.status(200).json({ blurDataURL: base64 });
  } catch (error) {
    console.error('Error generando blurDataURL:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
