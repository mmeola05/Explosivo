<template>
    <q-page class="q-pa-md">
        <div class="plan-container">
            <q-list class="plan-list">
                <q-item v-for="plan in plans" :key="plan.id" clickable @click="goToPlan(plan.id)" class="plan-item">
                    <q-item-section>{{ plan.name }}</q-item-section>
                </q-item>
            </q-list>
            <q-btn @click="openNewPlanModal" color="primary" label="Crear nuevo plan" class="create-plan-button" />
            <new-plan-modal v-if="isModalOpen" :visible="isModalOpen" @close="isModalOpen = false" @plan-created="fetchPlans"/>
        </div>
    </q-page>
</template>

<script>
import { ref, onValue } from 'firebase/database';
import { db } from 'src/firebase';
import NewPlanModal from '../components/NewPlan.vue';

export default {
    data() {
        return {
            plans: [],
            isModalOpen: false,
        };
    },
    components: {
        NewPlanModal,
    },
    methods: {
        async fetchPlans() {
            const plansRef = ref(db, 'plans/');
            onValue(plansRef, (snapshot) => {
                const data = snapshot.val();
                this.plans = data ? Object.entries(data).map(([id, plan]) => ({ id, ...plan })) : [];
                console.log("Planes obtenidos:", this.plans); // Para depuración
            });
        },
        goToPlan(id) {
            this.$router.push(`/plan/${id}`);
        },
        openNewPlanModal() {
            console.log("Abriendo modal para crear un nuevo plan");
            this.isModalOpen = true;
            console.log("isModalOpen:", this.isModalOpen); // Para verificar el estado
        },
    },
    mounted() {
        this.fetchPlans();
    },
};
</script>

<style scoped>
.plan-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.plan-list {
    margin-bottom: 20px; /* Espacio entre la lista y el botón de crear nuevo plan */
}

.plan-item {
    transition: background-color 0.3s;
}

.plan-item:hover {
    background-color: #e3f2fd; /* Color de fondo al pasar el ratón */
}

.create-plan-button {
    width: 100%; /* Botón ocupa todo el ancho */
}
</style>
