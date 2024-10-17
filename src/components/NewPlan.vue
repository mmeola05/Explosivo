<template>
    <q-dialog v-model="localVisible">
        <q-card>
            <q-card-section>
                <div class="text-h6">Crear un nuevo plan</div>
            </q-card-section>

            <q-card-section>
                <q-input v-model="planName" label="Nombre del plan" class="plan-input" />
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="primary" @click="closeDialog" />
                <q-btn flat label="Crear" color="primary" @click="createPlan" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export default {
    props: ['visible'],
    data() {
        return {
            planName: '',
            localVisible: this.visible,
        };
    },
    watch: {
        visible(val) {
            this.localVisible = val; // Sincroniza localVisible con la prop visible
        },
        localVisible(val) {
            if (!val) {
                this.$emit('close'); // Emite el evento de cierre cuando el diálogo se cierra
            }
        },
    },
    methods: {
        async createPlan() {
            console.log("Intentando crear un plan con el nombre:", this.planName);
            if (this.planName) {
                const plansRef = ref(db, 'plans/');
                await push(plansRef, { name: this.planName });
                console.log("Plan creado exitosamente");
                this.closeDialog();
                this.$emit('plan-created');
            } else {
                console.log("El nombre del plan está vacío");
            }
        },
        closeDialog() {
            console.log("Cerrando modal");
            this.localVisible = false;
        },
    },
};
</script>

<style scoped>
.plan-input {
    margin-bottom: 20px; /* Espacio inferior para el input */
}
</style>
