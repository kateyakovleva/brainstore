<?php

namespace App\Utils;

class ReflectionUses
{
    protected $useStatements;

    public function __construct(string $file)
    {
        $tokens = \token_get_all(file_get_contents($file));

        $namespace = '';
        while (null !== key($tokens)) {
            $token = \current($tokens);

            if (\is_array($token) && $token[0] === T_NAMESPACE) {
                \next($tokens);
                \next($tokens);

                $token = \current($tokens);

                if (\is_array($token) && $token[0] === T_NAME_QUALIFIED) {
                    $namespace = $token[1];
                }
            }

            if (\is_array($token) && $token[0] === T_USE) {
                \next($tokens);
                \next($tokens);

                $token = \current($tokens);

                if (\is_array($token) && $token[0] === T_NAME_QUALIFIED) {
                    $alias = explode('\\', $token[1]);
                    $alias = $alias[count($alias) - 1];
                    $this->useStatements[$alias] = $token[1];
                }
            }

            \next($tokens);
        }

        $dir = pathinfo($file)['dirname'];
        if (!$dir) return;
        foreach (glob("$dir/*.php") as $filename) {
            $className = pathinfo($filename)['filename'];
            $this->useStatements[$className] = "$namespace\\$className";
        }
    }

    public function getClass(string $alias)
    {
        $alias = trim($alias);
        if (str_contains($alias, '\\')) {
            return $alias;
        }
        $alias = explode('\\', $alias);
        $className = $alias[count($alias) - 1];
        return $this->useStatements[$className] ?? null;
    }
}
