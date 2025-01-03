import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { verifyUserCode, sendVerificationCode, updateVerificationStatus } from "./api/api_verification";
import { getUserByEmail } from "./api/api_getById";
import { getCompanyByEmail } from "./api/api_company";

const View5 = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const handleSendCode = async () => {
    try {
      console.log("Validando recuperación de contraseña o registro...");
      const recoveryEmail = window.localStorage.getItem("recuperacion");
      let userId;

      if (recoveryEmail) {
        // Buscar usuario o compañía por correo electrónico
        const user = await getUserByEmail(recoveryEmail);
        if (user) {
          console.log("Usuario encontrado:", user);
          userId = user.data.user.id;
          window.localStorage.setItem("tipoUsuario", "user");
        } else {
          console.log("No se encontró usuario con ese email. Buscando compañía...");
          const company = await getCompanyByEmail(recoveryEmail);
          if (company) {
            userId = company.data.company.id;
            window.localStorage.setItem("tipoUsuario", "company");
          } 
        }
      } else {
        // Si no hay email, recuperar el userId directamente desde localStorage
        userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("Error al recuperar el ID del usuario. Intenta registrarte de nuevo.");
        }
      }

      // Verificar que el userId se haya obtenido correctamente
      if (!userId) {
        throw new Error("No se pudo determinar el ID del usuario o compañía.");
      }

      // Enviar el código de verificación
      await sendVerificationCode(userId);
      setCanResend(false);
      console.log("Código de verificación enviado. Desactivando botón de reenviar.");

      // Configurar temporizador para habilitar nuevamente el botón
      const countdown = setTimeout(() => {
        setCanResend(true);
        console.log("Tiempo de espera terminado. Botón de reenviar habilitado.");
      }, 3600000);

      setTimer(countdown);
    } catch (error) {
      console.error("Error al enviar el código:", error);
      setError(error.message || "Error al enviar el código. Inténtalo de nuevo.");
    }
  };


  const handleVerification = async () => {
    if (code.length !== 6) {
      setError("El código debe tener 6 caracteres.");
      return;
    }
  
    try {
      setLoading(true);
      console.log("Verificando el código de usuario...");
  
      const recoveryEmail = window.localStorage.getItem("recuperacion");
      let userId, userType;
  
      if (recoveryEmail) {
        // Si existe un email de recuperación, buscar usuario o compañía
        const user = await getUserByEmail(recoveryEmail);
  
        if (user) {
          userId = user.data.user._id;
          userType = "recuperaUser";
          window.localStorage.setItem("tipoUsuario", userType);
          window.localStorage.setItem("userId", userId);
        } else {
          console.log("No se encontró usuario con ese email. Buscando compañía...");
          const company = await getCompanyByEmail(recoveryEmail);
  
          if (company) {
            userId = company.data.company._id;
            userType = "recuperaCompany";
            window.localStorage.setItem("tipoUsuario", userType);
            window.localStorage.setItem("userId", userId);
          } else {
            console.log("No se encontró cuenta asociada al email de recuperación.");
          }
        }
      }
  
      // Si no hay un email de recuperación o no se encuentra usuario/compañía, usar userId de localStorage
      if (!userId) {
        userId = localStorage.getItem("userId");
        userType = localStorage.getItem("tipoUsuario")
  
        if (!userId) {
          throw new Error("Error al recuperar el ID del usuario. Intenta registrarte de nuevo.");
        }
      }
  
      console.log(`ID de ${userType}:`, userId);
  
      // Verificar el código de usuario
      const isVerified = await verifyUserCode(userId, code);
      if (isVerified) {
        console.log("Código de verificación válido.");
  
        // Actualizar estado de verificación
        await updateVerificationStatus(userId);
  
        // Redirigir según el tipo de usuario
        if (userType === "recuperaUser" || userType === "recuperaCompany") {
          router.push("/actualizarContrasena");
        } else {
          handleRedirect(userType); // Redirigir para registro o acciones adicionales
        }
      } else {
        setError("Código de verificación inválido o expirado.");
      }
    } catch (error) {
      console.error("Error al verificar el código:", error);
      setError(error.message || "Error al verificar el código. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  


  const handleRedirect = (userType) => {
    console.log("Redireccionando según el tipo de usuario:", userType);
    if (userType === "company") {
      router.push("/formulario-de-accesibilidad");
    } else if (userType === "user") {
      router.push("/datos-de-usuario");
    } else {
      console.log("Tipo de usuario no definido.");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("recuperacion") && localStorage.getItem("userId")) {
      handleSendCode();
    }
  }, []);

  return (
    <div className="max-w-md w-full mx-auto">
      <h1 className="text-center text-2xl text-[#2F4F4F] p-10 font-extrabold">
        ¡Revisa tu correo!
      </h1>
      <h3 className="text-center text-[#2F4F4F] p-1 font-extrabold">
        Te hemos enviado un código de verificación. A continuación, escribe el código que te enviamos para validar tu cuenta.
      </h3>

      <div className="text-center flex justify-center p-10">
        <div>
          <label className="text-center flex justify-center text-[#2F4F4F] p-1 font-bold">
            Confirma Tu Código
          </label>
          <input
            type="text"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="555-555"
            className="px-10 py-2 border bg-[#F6F9FF] text-center rounded-md text-sm font-medium text-[#546E7A] hover:bg-[#ECEFF1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0BEC5]"
          />
        </div>
      </div>

      <div className="flex justify-center items-center py-5">
        <button
          onClick={handleVerification}
          disabled={loading}
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#2F4F4F] hover:bg-[#004D40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00695C]"
        >
          {loading ? "Verificando..." : "Confirmar"}
        </button>
      </div>
      <div className="flex flex-col items-center mt-5">
        <button
          onClick={handleSendCode}
          disabled={!canResend}
          className="w-[155px] h-[40px] bg-white border-2 rounded-lg"
        >
          {canResend ? "Reenviar código" : "Esperar 1:00"}
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default View5;
