import IFuncionarioRepository from "../interface/repository/IFuncionarioRepository";
import FuncionarioCreatePresenter from "../interface/view/FuncionarioCreatePresenter";
import FuncionarioDeletePresenter from "../interface/view/FuncionarioDeletePresenter";
import FuncionarioReadPresenter from "../interface/view/FuncionarioReadPresenter";
import FuncionarioUpdatePresenter from "../interface/view/FuncionarioUpdatePresenter";
import FuncionarioRepositoryPrismaImpl from "../plugin/repository/FuncionarioRepositoryPrismaImpl";
import FuncionarioCreateService from "../service/create/FuncionarioCreateService";
import IFuncionarioCreateServiceOutput from "../service/create/IFuncionarioCreateServiceOutput";
import FuncionarioDeleteService from "../service/delete/FuncionarioDeleteService";
import IFuncionarioDeleteServiceOutput from "../service/delete/IFuncionarioDeleteServiceOutput";
import FuncionarioReadAllService from "../service/read/FuncionarioReadAllService";
import FuncionarioReadUniqueByNameService from "../service/read/FuncionarioReadByNameService";
import FuncionarioReadUniqueService from "../service/read/FuncionarioReadUniqueService";
import IFuncionarioReadServiceOutput from "../service/read/IFuncionarioReadServiceOutput";
import FuncionarioUpdateService from "../service/update/FuncionarioUpdateService";
import IFuncionarioUpdateServiceOutput from "../service/update/IFuncionarioUpdateServiceOutput";

export default class FuncionarioServiceDependencyInjector
{
    async injectIntoCreate()
    {
        const repository: IFuncionarioRepository = new FuncionarioRepositoryPrismaImpl();
        const presenter: IFuncionarioCreateServiceOutput = new FuncionarioCreatePresenter();

        return new FuncionarioCreateService(repository, presenter);
    }

    async injectIntoUpdate()
    {
        const repository: IFuncionarioRepository = new FuncionarioRepositoryPrismaImpl();
        const presenter: IFuncionarioUpdateServiceOutput = new FuncionarioUpdatePresenter();

        return new FuncionarioUpdateService(repository, presenter);
    }

    async injectIntoDelete()
    {
        const repository: IFuncionarioRepository = new FuncionarioRepositoryPrismaImpl();
        const presenter: IFuncionarioDeleteServiceOutput = new FuncionarioDeletePresenter();

        return new FuncionarioDeleteService(repository, presenter);
    }

    async injectIntoReadUnique()
    {
        const repository: IFuncionarioRepository = new FuncionarioRepositoryPrismaImpl();
        const presenter: IFuncionarioReadServiceOutput = new FuncionarioReadPresenter();

        return new FuncionarioReadUniqueService(repository, presenter);
    }

    async injectIntoReadUniqueByName()
    {
        const repository: IFuncionarioRepository = new FuncionarioRepositoryPrismaImpl();
        const presenter: IFuncionarioReadServiceOutput = new FuncionarioReadPresenter();

        return new FuncionarioReadUniqueByNameService(repository, presenter);
    }

    async injectIntoReadAll()
    {
        const repository: IFuncionarioRepository = new FuncionarioRepositoryPrismaImpl();
        const presenter: IFuncionarioReadServiceOutput = new FuncionarioReadPresenter();

        return new FuncionarioReadAllService(repository, presenter);
    }
    
}