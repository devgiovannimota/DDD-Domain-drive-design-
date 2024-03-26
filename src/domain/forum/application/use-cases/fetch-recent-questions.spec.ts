/* eslint-disable prettier/prettier */
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { MakeQuestion } from "test/factories/make-question";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let fetchRecentQuestionsUseCase: FetchRecentQuestionsUseCase;

describe("Fetch questions", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    fetchRecentQuestionsUseCase = new FetchRecentQuestionsUseCase(
      inMemoryQuestionsRepository
    );
  });
  it("Should be able to fetch recent questions", async () => {
    await inMemoryQuestionsRepository.create(
      MakeQuestion({ createdAt: new Date(2022, 0, 20) })
    );
    await inMemoryQuestionsRepository.create(
      MakeQuestion({ createdAt: new Date(2022, 0, 18) })
    );
    await inMemoryQuestionsRepository.create(
      MakeQuestion({ createdAt: new Date(2022, 0, 23) })
    );

    const { questions } = await fetchRecentQuestionsUseCase.execute({
      page: 1,
    });

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });

  it("Should be able to fetch paginated recent questions", async () => {
    for (let i = 1; i <= 23; i++) {
      await inMemoryQuestionsRepository.create(MakeQuestion());
    }
    const { questions } = await fetchRecentQuestionsUseCase.execute({
      page: 2,
    });
    console.log(questions);
    expect(questions).toHaveLength(3);
  });
});
