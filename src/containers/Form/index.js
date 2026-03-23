import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({
    nom: "",
    prenom: "",
    type: "",
    email: "",
    message: "",
  });

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        setSent(true);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  if (sent) {
    return (
      <div className="successMessage">
        <p>Message envoyé !</p>
      </div>
    );
  }

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            value={values.nom}
            onChange={(e) => setValues({ ...values, nom: e.target.value })}
          />
          <Field
            placeholder=""
            label="Prénom"
            value={values.prenom}
            onChange={(e) => setValues({ ...values, prenom: e.target.value })}
          />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={(value) => setValues({ ...values, type: value })}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            placeholder=""
            label="Email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={values.message}
            onChange={(e) => setValues({ ...values, message: e.target.value })}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;