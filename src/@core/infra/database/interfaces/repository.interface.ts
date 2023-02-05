export interface RepositoryInterface<Model> {
	getAll(): Promise<Model[]>;
}
