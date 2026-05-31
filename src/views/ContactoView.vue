<template>
  <main class="contacto-page-wrapper">
    <div class="container">
      <h1>Contacta amb nosaltres</h1>

      <div v-if="enviat" class="success-box">
        <h2>Dades enviades correctament!</h2>
        <p>Gràcies per contactar amb nosaltres, {{ nom }}.</p>
        <button type="button" @click="irAlInicio">Tornar a l'inici</button>
      </div>

      <Form v-else @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, meta }">
        
        <div class="form-group">
          <label for="nom">Nom:</label>
          <Field name="nom" v-model="nom" type="text" :class="{ 'is-invalid': errors.nom }" />
          <ErrorMessage name="nom" class="error-text" />
        </div>

        <div class="form-group">
          <label for="email">Correu:</label>
          <Field name="email" v-model="email" type="text" :class="{ 'is-invalid': errors.email }" />
          <ErrorMessage name="email" class="error-text" />
        </div>

        <div class="form-group">
          <label for="edat">Edat:</label>
          <Field name="edat" v-model="edat" type="number" :class="{ 'is-invalid': errors.edat }" />
          <ErrorMessage name="edat" class="error-text" />
        </div>

        <div class="form-group">
          <label for="telefon">Telèfon:</label>
          <Field name="telefon" v-model="telefon" type="tel" placeholder="600123456" :class="{ 'is-invalid': errors.telefon }" />
          <ErrorMessage name="telefon" class="error-text" />
        </div>

        <div class="form-group simple-checkbox">
          <Field name="consentiment" v-model="consentiment" type="checkbox" :value="true" :unchecked-value="false" id="consentiment" />
          <label for="consentiment">Accepte el tractament de les meves dades</label>
          <ErrorMessage name="consentiment" class="error-text" />
        </div>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()
const nom = ref(''), email = ref(''), edat = ref(''), telefon = ref(''), consentiment = ref(false)
const enviat = ref(false)

// Definició de l'esquema de validació (el teu "contracte" de dades)
const schema = yup.object({
  nom: yup.string().min(3, 'Mínim 3 caràcters').required('El nom és obligatori'),
  email: yup.string().email('Correu no vàlid').required('El correu és obligatori'),
  edat: yup.number().typeError('Ha de ser un número').min(18, 'Mínim 18 anys').max(99, 'Màxim 99 anys').required('L\'edat és obligatòria'),
  telefon: yup.string().matches(/^[0-9]{9}$/, 'Ha de tindre 9 dígits').required('El telèfon és obligatori'),
  consentiment: yup.boolean().oneOf([true], 'Has d\'acceptar les condicions')
})

const onSubmit = (values) => {
  console.log("Dades validades:", values)
  enviat.value = true
}

const irAlInicio = () => router.push('/')
</script>

<style scoped>
@import '@/assets/contactes.css';
.error-text { color: #ff4444; font-size: 0.8rem; display: block; margin-top: 5px; }
.is-invalid { border: 2px solid #ff4444 !important; }
</style>