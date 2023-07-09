<?php

namespace App\Controller\Admin;

use App\Entity\Cle;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\{AssociationField, DateField, IdField, TextField,TextareaField};

class ApiCleCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Cle::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('name')->setLabel('Titre'),
            TextField::new('api')->setLabel('Cle API'),
            TextField::new('uid')->setLabel('UID'),

        ];
    }

}
