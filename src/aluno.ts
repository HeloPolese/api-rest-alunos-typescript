import { Aluno, AlunoNovo, AlunoParcial } from "./tipos";

const alunos = [
    {id: 1, nome: 'Daniela Pamoline', curso: 'Sistemas para Internet',matricula: '20251tsi', ano: 2025, ativo: true},
    {id: 2, nome: 'Maria Antonia', curso: 'Biologia',matricula: '2025bio', ano: 2025, ativo: true},
    {id: 3, nome: 'Marcos Castro', curso: 'Medicina',matricula: '20241med', ano: 2024, ativo: false},
    {id: 4, nome: 'Fernando Braga', curso: 'Agronomia',matricula: '20231agro', ano: 2023, ativo: true},
];

const proximoId = 5;


export function listar(): Aluno[] {
    return alunos;
}

export function buscar(id: number): Aluno | undefined {
    return alunos.find((aluno)=> aluno.id === id);
}

export function listarAtivos() {
    return alunos.filter((aluno)=> aluno.ativo === true);
}

export function criar(dados:AlunoNovo): Aluno {
    const aluno: Aluno = {...dados, id: proximoId};
    alunos.push(aluno);
    return aluno;
}

export function substituir(id: number, dados: AlunoNovo): Aluno | undefined {
    const index = alunos.findIndex((aluno)=> aluno.id === id);

    if (index === -1) {
        return undefined;
    }

    alunos[index] = {id:id, ...dados};
    return alunos[index];
}

export function atualizar(id: number, dados: AlunoParcial): Aluno | undefined {
    console.log(dados)
    const index = alunos.findIndex((aluno)=> aluno.id === id);

    if (index === -1) {
        return undefined;
    }

    alunos[index] = {...alunos[index], ...dados, id: id};
    console.log(alunos[index])
    return alunos[index];
}


export function remover(id:number):boolean {
    const index = alunos.findIndex((aluno)=> aluno.id === id);

    if (index === -1) {
        return false;
    }

    alunos.splice(index,1);
    return true;
}