<?php

namespace App\Controller\Admin;

use App\Entity\Cle;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        return $this->render('admin/index.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Admin Zone');
    }

    public function configureMenuItems(): iterable
    {

        return [
            MenuItem::linkToDashboard('Dashboard', 'fa fa-home'),

            MenuItem::section('Gestion de la base de données'),
            MenuItem::linkToCrud('Cle', 'fas fa-list', Cle::class),
           


           // MenuItem::linkToLogout('Déconnexion', 'fa fa-fa fa-sign-out')
         ];
    }
}
