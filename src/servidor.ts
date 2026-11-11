import express from "express";
import { Request, Response } from "express";
import { StatusHttp, Aluno, AlunoNovo, AlunoParcial } from "./tipos";
import * as Repositorio from "./aluno";
import { ehAlunoNovo, ehAlunoParcial, lerId } from "./validacao";

const app = express();

const PORTA = 3000;

app.use(express.json());

app.disable("x-powered-by");

const ID_INVALIDO: string = "Id inválido!";
const CORPO_INVALIDO: string = "corpo inválido!";
const ALUNO_NAO_ENCONTRADO: string = "Aluno não encontrado!";

function responderErros(
  res: Response,
  statusHttp: StatusHttp,
  mensagem: string,
): void {
  res.status(statusHttp).json({ erro: mensagem });
}

function listar(req: Request, res: Response): void {
  res.status(StatusHttp.ok).json(Repositorio.listar());
}

function listarAtivos(req: Request, res: Response): void {
  console.log(2);
  res.status(StatusHttp.ok).json(Repositorio.listarAtivos());
}

function buscar(req: Request<{ id: string }>, res: Response): void {
     console.log(3);
  const id = lerId(req.params.id);

  if (id === undefined) {
    return responderErros(res, StatusHttp.requisicaoMalFormatada, ID_INVALIDO);
  }

  res.status(StatusHttp.ok).json(Repositorio.buscar(id));
}

function criar(req: Request, res: Response): void {
  const corpo: unknown = req.body;

  if (!ehAlunoNovo(corpo)) {
    return responderErros(
      res,
      StatusHttp.entidadeNaoProcessavel,
      CORPO_INVALIDO,
    );
  }

  const aluno = Repositorio.criar({ ...corpo, ativo: corpo.ativo ?? true });

  res.status(StatusHttp.criado).location(`alunos/${aluno.id}`).json(aluno);
}

function substituir(req: Request<{ id: string }>, res: Response): void {
  const id = lerId(req.params.id);
  const corpo: unknown = req.body;

  if (id === undefined) {
    return responderErros(res, StatusHttp.entidadeNaoProcessavel, ID_INVALIDO);
  }

  if (!ehAlunoNovo(corpo)) {
    return responderErros(
      res,
      StatusHttp.entidadeNaoProcessavel,
      CORPO_INVALIDO,
    );
  }

  const aluno = Repositorio.substituir(id, {
    ...corpo,
    ativo: corpo.ativo ?? true,
  });

  if (aluno === undefined) {
    return responderErros(res, StatusHttp.naoEncontrado, ALUNO_NAO_ENCONTRADO);
  }

  res.status(StatusHttp.ok).json(aluno);
}

function atualizar(req: Request<{ id: string }>, res: Response): void {
  const id = lerId(req.params.id);
  const corpo: unknown = req.body;

  if (id === undefined) {
    return responderErros(res, StatusHttp.requisicaoMalFormatada, ID_INVALIDO);
  }

  if (!ehAlunoParcial(corpo)) {
    return responderErros(
      res,
      StatusHttp.entidadeNaoProcessavel,
      CORPO_INVALIDO,
    );
  }

  const aluno = Repositorio.atualizar(id, {
    ...corpo,
    ativo: corpo.ativo ?? true,
  });

  if (aluno === undefined) {
    return responderErros(
      res,
      StatusHttp.naoEncontrado,
      "Aluno não encontrado!",
    );
  }

  res.status(StatusHttp.ok).json(aluno);
}

function remover(req: Request<{ id: string }>, res: Response): void {
  const id = lerId(req.params.id);

  if (id === undefined) {
    return responderErros(res, StatusHttp.entidadeNaoProcessavel, ID_INVALIDO);
  }

  if (!Repositorio.remover(id)) {
    return responderErros(
      res,
      StatusHttp.naoEncontrado,
      "Aluno não encontrado!",
    );
  }

  res.status(StatusHttp.semConteudo).end();
}

function metodoNaoPermitido(req: Request, res: Response): void {
  return responderErros(
    res,
    StatusHttp.metodoNaoPermitido,
    `Método ${req.method}${req.path} não permitido nesta url!`,
  );
}

app.get("/alunos/ativos", listarAtivos);

app.route("/alunos").get(listar).post(criar).all(metodoNaoPermitido);

app
  .route("/alunos/:id")
  .get(buscar)
  .put(substituir)
  .patch(atualizar)
  .delete(remover)
  .all(metodoNaoPermitido);



app.use((req: Request, res: Response) => {
  res
    .status(StatusHttp.naoEncontrado)
    .json(`Rota ${req.method}${req.path} não encontrada!`);
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
