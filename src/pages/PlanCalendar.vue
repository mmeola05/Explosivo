<template>
    <q-page class="q-pa-md">
        <div class="vote-container">
            <q-btn @click="goBack" color="secondary" label="Volver a la lista de planes" class="back-button" />

            <q-date v-model="selectedDate" label="Selecciona una fecha" class="vote-input" />
            <q-input v-model="userName" label="Tu nombre" class="vote-input" />
            <q-btn @click="voteForDate" color="primary" label="Votar por esta fecha" class="vote-button" />

            <div v-if="votes.length" class="votes-list">
                <h4 class="votes-title">Votos para este plan:</h4>
                <ul>
                    <li v-for="(vote, index) in votes" :key="index" class="vote-item">
                        {{ vote.date }} - {{ vote.names.length }} votos: {{ vote.names.join(', ') }}
                    </li>
                </ul>
            </div>
        </div>
    </q-page>
</template>

<script>
import { ref, onValue, set, get } from 'firebase/database';
import { db } from 'src/firebase';
import { useRouter } from 'vue-router'; // Importar useRouter

export default {
    data() {
        return {
            selectedDate: '',
            userName: '',
            votes: [],
        };
    },
    setup() {
        const router = useRouter(); // Instanciar el router
        return { router };
    },
    methods: {
        async voteForDate() {
            if (!this.selectedDate || !this.userName) return;

            const ruta = this.selectedDate; // 'YYYY-MM-DD'
            const planRef = ref(db, `plans/${this.$route.params.id}/votes/${ruta}`);
            const snapshot = await get(planRef);
            let existingVote = snapshot.val() || { names: [] };

            if (!existingVote.names.includes(this.userName)) {
                existingVote.names.push(this.userName);
            }

            await set(planRef, { names: existingVote.names });
            this.fetchVotes();
        },
        async fetchVotes() {
            const planRef = ref(db, `plans/${this.$route.params.id}/votes`);
            onValue(planRef, (snapshot) => {
                let votes = snapshot.val() || {};
                const votesArray = [];

                for (const year in votes) {
                    for (const month in votes[year]) {
                        for (const day in votes[year][month]) {
                            const names = votes[year][month][day].names || [];
                            const date = `${year}-${month}-${day}`;
                            votesArray.push({ date, names });
                        }
                    }
                }

                this.votes = votesArray;
            });
        },
        goBack() {
            this.router.push('/'); // Cambia esta ruta por la de tu lista de planes
        },
    },
    mounted() {
        this.fetchVotes();
    },
};
</script>

<style scoped>
.vote-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.back-button {
    margin-bottom: 20px; /* Espacio entre el botón de volver y los inputs */
}

.vote-input {
    margin-bottom: 20px;
}

.vote-button {
    width: 100%;
    margin-bottom: 20px;
}

.votes-list {
    margin-top: 20px;
}

.votes-title {
    font-size: 1.5em;
    color: #333;
    margin-bottom: 10px;
}

.vote-item {
    background-color: #e3f2fd;
    padding: 10px;
    border-radius: 5px;
    margin: 5px 0;
    transition: background-color 0.3s;
}

.vote-item:hover {
    background-color: #bbdefb;
}
</style>
