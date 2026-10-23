'use client';

import MailForm, { Field } from './MailForm';

export default function CompanyForm() {
  return (
    <MailForm
      id="company-form"
      subject="Förfrågan om företagsavtal: Taxi Helsingborg 24x7"
      kind="förfrågan"
      submitLabel="Skicka förfrågan"
      autoresponse="Tack för din förfrågan om företagsavtal hos Taxi Helsingborg 24x7! Vi återkommer till dig så snart vi kan. Frågor? Ring oss på 042-18 09 00."
      light
    >
      <input type="hidden" name="Typ" value="Företagsavtal" />
      <div className="row">
        <Field label="Företag">
          <input name="Företag" type="text" required autoComplete="organization" />
        </Field>
        <Field label="Org.nummer" optional>
          <input name="Organisationsnummer" type="text" inputMode="numeric" />
        </Field>
      </div>
      <div className="row row-pair">
        <Field label="Kontaktperson">
          <input name="Namn" type="text" required autoComplete="name" />
        </Field>
        <Field label="Telefon">
          <input name="Telefon" type="tel" required autoComplete="tel" inputMode="tel" />
        </Field>
      </div>
      <Field label="E-post">
        <input name="email" type="email" required autoComplete="email" />
      </Field>
      <Field label="Meddelande" optional>
        <textarea name="Meddelande" rows={3} />
      </Field>
    </MailForm>
  );
}
